export class NotificationsVO {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.content = data.content;
        this.user_username = data.user_username;
        this.type_id = data.type_id;
    }
}