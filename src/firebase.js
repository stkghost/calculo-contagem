import app from 'firebase/app'; ////import firebase.app
import 'firebase/database' //import firebase.database
import 'firebase/auth'; //import firebase.auth



    //configurações do Firebase
    let firebaseConfig = {
        apiKey: "AIzaSyBQhPDyiE0ySzRxI9rkLG5xO7w4IT5iob0",
        authDomain: "contagem-61203.firebaseapp.com",
        databaseURL: "https://contagem-61203.firebaseio.com",
        projectId: "contagem-61203",
        storageBucket: "contagem-61203.appspot.com",
        messagingSenderId: "173014736455",
        appId: "1:173014736455:web:aedaa065958ad975aa9b62",
        measurementId: "G-VFMT1GYFB7"
    };
  // Initialize Firebase


//class para inicializar o firebase
class Firebase {
    constructor(){
        //método constructo para inicializar o Firebase
        app.initializeApp(firebaseConfig);

        this.app = app.database()
        this.auth = app.auth()
    }
    //metodo login recebe login e password
    //retorna o metódo signInWithEmailAndPassword recebendo o e-mail e password
    async login(email, password) {
        const user = await app.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err)
        })
        return user
    }

    //metodo register para receber dados pessoais e criar usuário com email e password
    async register(name, email, password, cpf) {
        await app.auth().createUserWithEmailAndPassword(email, password)
        
        //pegar o id do usuário para referenciar no banco de dados
        const uid = app.auth().currentUser.uid

        //retornar um novo usuário na database
        return app.database().ref('usuarios').child(uid).set({
            name: name,
            cpf: cpf
        })
    }
    //função para verificar se o user está logado ou não
    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }
    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }
    
    async logout(){
        await app.auth().signOut().catch(err => {
            console.log(err)
        })
    }
    isAuthenticated() {
        
    }
    
}



export default new Firebase()