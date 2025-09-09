export interface Product {
  id: number;
  product_code: string;
  status: string;
  vendor_code: string;
  operator_code: string;
  supported_countries: string;
  note: string;
  date_created: string;
  last_modified_date: string;
  attribute?: { [key: string]: string }; // dynamic attributes (optional)
}
