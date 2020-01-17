export interface Article {
  id: number;
  barcode: string;
  name: string;
  groupId: number;
  unitId: number;
  contentAmount: number;
  hasLifetime: boolean;
  imageUrl: string;
  totalStockAmount: number;
  articleUserSettings: ArticleUserSettings;
}
