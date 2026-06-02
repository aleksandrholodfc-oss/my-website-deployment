import React from 'react';

interface GenericListTabProps {
  data: any[];
  renderFields: (item: any, index: number) => React.ReactNode;
  titlePrefix?: string;
}

export const GenericListTab: React.FC<GenericListTabProps> = ({
  data,
  renderFields,
  titlePrefix = 'Элемент',
}) => {
  return (
    <div className="space-y-8">
      {data?.map((item, index) => (
        <div key={item.id || index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/30">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            {titlePrefix} #{index + 1}
          </h3>
          <div className="space-y-4">{renderFields(item, index)}</div>
        </div>
      ))}
    </div>
  );
};
