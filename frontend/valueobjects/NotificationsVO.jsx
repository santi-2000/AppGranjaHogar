export class NotificationsVO {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.date = data.date;
        this.type = data.type || 'general';
    }
}