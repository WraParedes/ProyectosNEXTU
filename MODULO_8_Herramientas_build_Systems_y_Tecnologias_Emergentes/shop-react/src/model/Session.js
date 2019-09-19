export default class Session {

    static instance = null;
     
    user = null;

    static getInstance() {
        if (this.instance == null) {
            this.instance = new Session();
        }
        return this.instance;
    }
}