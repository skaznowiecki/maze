class UnprocessableEntityException extends Error {
    constructor (message) {   
        super(message);

        this.name = message;
        this.status = 422
      }
    
      statusCode() {
        return this.status
      }
}

module.exports = UnprocessableEntityException;
