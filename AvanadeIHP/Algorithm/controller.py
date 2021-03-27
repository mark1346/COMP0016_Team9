from gensim.models import KeyedVectors
import algorithm
import modelFactory
import ocr

class maincontroller:
    def __init__(self):
        self.__modelFactory = modelFactory.model()
        self.__algo = None
        self.__biasPairAddress = 'GenderBiasPair.csv'

# Model related functions
    def setType(self,type): #Set model type : type = 0 online pretrained model, type = 1 online training corpus, type = 2 Url pretrained model
        self.__modelFactory.setType(type)

    def setModelSelection(self,select): #set model of corpus selection based on the lists returned by method: getPretrainedModelList() and getCorporaList()
        self.__modelFactory.setSelect(select)

    def getModel(self):# return model in factory
        return self.__modelFactory.getModel()

    def getPretrainedModelList(self):# get name list of pretrained model
        return self.__modelFactory.getPretrainedModelList()

    def getCorporaList(self):# get name list of corpus that used to train model
        return self.__modelFactory.getCorporaList()

    def changeModel(self):
        self.modelSetting()
        self.__algo.changeModel(self,self.__modelFactory.getModel)

    def changeUrl(self,address):
        self.__modelFactory.setlocalModelAddress(address)

    # def train(self):
    #     self.__modelFactory.trainModel()

    def modelSetting(self): #initialised the model & change the model
        #type = 0 online pretrained model, type = 1 online training corpus, type = 2 Url pretrained model
        self.__modelFactory.generateModel()

#----------------------------------------

#Algorithm related functions
    def algorithm_init(self): #initialise the algorithm structure
        self.__algo = algorithm.biasAlgorithm(self.__modelFactory.getModel(),self.__biasPairAddress)

    #Bias pair related functions
    def setBiasPair(self,address): #change bias pair by given it bias csv location
        self.__biasPairAddress =address
        self.__algo.changeBiasPair(self.__biasPairAddress)

    def addBiasPair(self,biasPair):#add bias pair in current storage, but not change the csv file
        self.__algo.add_pair(biasPair)
    #------------------------------

#----------------------------------------

#OCR function
    def readimage(self,address):# read character from image
        self.ocr = ocr.OCR()
        return self.ocr.readimage(address)
#----------------------------------------

#Running functions
    def initialise(self):
        self.modelSetting()
        self.algorithm_init()

    def processSentence(self,sentence):
        result = self.__algo.detect(sentence)
        return result

    def run_example1(self):
        cc = maincontroller()#create instance
        cc.setType(2)#use url local model
        cc.initialise()#init model and algo
        sentence = cc.readimage("cv_example.png") #read input from OCR
        print(cc.processSentence(sentence))
#----------------------------------------



if __name__ == "__main__":
    rr = maincontroller()
    rr.run_example1()
