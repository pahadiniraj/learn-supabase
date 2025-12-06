import { useGetAttributesWithCategoryId } from "../../../lib/hooks/category";

type FilterWithAttributeProps = {
  selectedCategoryId?: number;
};

export default function FilterWithAttribute({
  selectedCategoryId,
}: FilterWithAttributeProps) {
  const { data: attributesWithCategory } =
    useGetAttributesWithCategoryId(selectedCategoryId);

  const handleAttributeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    console.log(value);
  };

  console.log(attributesWithCategory);

  return (
    <>
      <div className="px-6 flex gap-6 justify-end my-6">
        {attributesWithCategory?.data
          .filter((attr) =>
            selectedCategoryId === 1
              ? attr.attribute_name.toLowerCase() !== "size"
              : true
          )
          .map((value) => (
            <select
              key={value.attribute_id}
              value={""}
              onChange={handleAttributeChange}
              className="text-black border p-2 bg-white"
            >
              <option value="">{`Select ${value.attribute_name}`}</option>
              {value.values?.map((value) => (
                <option key={value.value_id} value={value.value_id}>
                  {value.value}
                </option>
              ))}
            </select>
          ))}
      </div>
    </>
  );
}
