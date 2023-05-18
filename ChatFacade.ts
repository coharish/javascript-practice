enum ChatProvider {
    Provider1 = 'Provider1',
    Provider2 = 'Provider2',
    Provider3 = 'Provider3'
}

class ChatFacade implements ChatProps {
    provider;
    constructor(provider: ChatProvider) {
        if (provider === ChatProvider.Provider1) {
            this.provider = new Provider1();
        } else if (provider === ChatProvider.Provider2) {
            this.provider = new Provider2();
        } else {
            this.provider = new Provider3();
        }
    }
    loadSdk(){ 
        console.log('Loading sdk');
        return this.provider.loadSdk();
    }

    initSdk(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    getUsers(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    getChatDetails(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    sendMessage(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }

}

type ChatProps = {
    loadSdk: () => Promise<ChatProvider>;
    initSdk: () => Promise<ChatProvider>;
    getUsers: () => Promise<Array<any>>;
    getChatDetails: () => Promise<Array<any>>;
    sendMessage: () => void;
}

type ChatProvider1Props = {
    loadSdk: () => Promise<ChatProvider>;
    getAllUsers: () => Promise<Array<any>>;
    getRoomById: () => Promise<Array<any>>;
    postMessage: () => void;
}

class Provider1 implements ChatProvider1Props{
    loadSdk(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    getAllUsers(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    getRoomById(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
    postMessage(){ 
        return Promise.reject('Provider1 Method Not Implemented');
    }
}

class Provider2 implements ChatProvider1Props{
    loadSdk(){ 
        return Promise.reject('Provider2 Method Not Implemented');
    }
    getAllUsers(){ 
        return Promise.reject('Provider2 Method Not Implemented');
    }
    getRoomById(){ 
        return Promise.reject('Provider2 Method Not Implemented');
    }
    postMessage(){ 
        return Promise.reject('Provider2 Method Not Implemented');
    }
}

class Provider3 implements ChatProvider1Props{
    loadSdk(){ 
        return Promise.reject('Provider3 Method Not Implemented');
    }
    getAllUsers(){ 
        return Promise.reject('Provider3 Method Not Implemented');
    }
    getRoomById(){ 
        return Promise.reject('Provider3 Method Not Implemented');
    }
    postMessage(){ 
        return Promise.reject('Provider3 Method Not Implemented');
    }
}

const googleChat = new ChatFacade(ChatProvider.Provider1);

try {
googleChat.loadSdk().then(() => {console.log('Loaded')}).catch(e => console.log(e));
// googleChat.initSdk();
} catch(e) {
    console.log(e);
}
