export class Alert {
    constructor(
        public readonly alertType: AlertType, 
        public readonly message: string
    ) {}
}

export enum AlertType { // permite colocar em uma constante os tipos
    SUCCESS,
    WARNING, 
    DANGER, 
    INFO
}