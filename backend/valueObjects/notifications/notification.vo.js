export default class NotificationVO {
  constructor(id, product_id, product_entry_id, content, notification_type, created_at) {
    this.id = id;
    this.product_id = product_id;
    this.product_entry_id = product_entry_id;
    this.content = content;
    this.notification_type = notification_type;
    this.created_at = created_at;

    Object.freeze(this);
  }
}
