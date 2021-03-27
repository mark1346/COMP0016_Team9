import numpy as np
from sklearn.decomposition import PCA
import gensim
import gensim.downloader as api
from gensim.models.word2vec import Word2Vec
from gensim.models import KeyedVectors
from nltk.tokenize import TweetTokenizer
import modelFactory
import json
import csv
import nltk
from nltk.corpus import wordnet

class biasAlgorithm:

    def __init__(self,model,biasPairAddress):
        self.__model = model
        self.__biased_word_pairs =self.__readBiasPair(biasPairAddress)
        self.__process_data()

    def estimate(self,index):
        if index == None:
            return "Unbiased"
        if(index >= 1.5 or index <= -1.5):
            return "Highly Biased"
        elif(index >= 1.05 or index <= -1.05):
            return "Intermediatly Biased"
        elif(index >= 1 or index <= -1):
            return "Lowly Biased"
        else:
            return "Unbiased"

    def __readBiasPair(self,address):
        pairlist = list(csv.reader(open(address,'r')))
        temp = []
        for x in pairlist:
           temp.append((x[0],x[1]))
        return temp

    def changeBiasPair(self,address):
        self.__biased_word_pairs =self.__readBiasPair(address)

    def getModel(self):
        return self.__model

    def changeModel(self,model):
        self.__model = model

    def __process_data(self):
        biasedPairs = []
        for pair in self.__biased_word_pairs:
            try:
                biasedPairs.append((self.__model[pair[0]], self.__model[pair[1]]))
            except:
                print(pair[0] + " and " + pair[1] + "are not in the web embedding")

        biases = [pair[0] - pair[1] for pair in biasedPairs]
        reversed_biases = [pair[1] - pair[0] for pair in biasedPairs]
        self.__pca = PCA(n_components=1)
        self.__pca.fit(np.array(biases + reversed_biases))
        self.__bias_mean_one = np.mean(self.__pca.transform(np.array([pair[0] for pair in biasedPairs])))
        self.__bias_mean_two = np.mean(self.__pca.transform(np.array([pair[1] for pair in biasedPairs])))

    def add_pair(self,newpair):
        self.__biased_word_pairs.extend(newpair)


    def __detect_bias_pca(self,word):
        if word not in self.__model:
            return None
        word_val = self.__pca.transform(np.array([self.__model[word]]))[0][0]
        return (word_val - (self.__bias_mean_two + self.__bias_mean_one) / 2) * 2 / (self.__bias_mean_two - self.__bias_mean_one)

    def detect(self,sentence):

        tokenizer = TweetTokenizer()
        tokens = tokenizer.tokenize(sentence)
        # table = str.maketrans('', '', string.punctuation)
        # tokens = [w.translate(table) for w in tokens]
        formattedTokens = [word.lower() for word in tokens]
        results = []
        for token in formattedTokens:
            index = self.__detect_bias_pca(token)
            status = self.estimate( index)
            if(status != "Unbiased" and status != "Lowly Biased"):
                synonyms = self.getSynonyms(token)
            else:
                synonyms = []
            token_result = {"original": tokens[formattedTokens.index(token)],"token": token, "bias":index,"status": status,"synonyms": synonyms}
            results.append(token_result)
        return json.dumps({"results": results},ensure_ascii=False)

    def getSynonyms(self,word):
        synonyms = set()
        #wordnet
        #nltk.download('wordnet')
        synList = wordnet.synsets(word)
        for syn in wordnet.synsets(word):
            for l in syn.lemmas():
                synonym = l.name().replace("_", " ").replace("-", " ").lower()
                synonym = "".join([char for char in synonym if char in ' qwertyuiopasdfghjklzxcvbnm'])
                synonyms.add(synonym)

        if word in synonyms:
            synonyms.remove(word)

        return list(synonyms)
