from multiprocessing import Process, Queue

class CompileUnit(Process):
    def __init__(self):
        super().__init__(daemon=True)

    def run(self):
        pass