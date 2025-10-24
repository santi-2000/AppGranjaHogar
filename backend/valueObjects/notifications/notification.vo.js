export default class NotificationVO {
  constructor({ id, user_id, content, type_id, user_username }) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.type_id = type_id;
    this.user_username = user_username

    Object.freeze(this);
  }
}
