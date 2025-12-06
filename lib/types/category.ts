export type CategoryResponseType = {
  id: number;
  name: string;
  parent_id: number | null;
};

export type AttributeValueType = {
  value_id: number;
  value: string;
  parent_value_id: number | null;
};

export type CategoryAttributeType = {
  attribute_id: number;
  attribute_name: string;
  values: AttributeValueType[];
};
