import _ from "lodash";

const getInfoData = ({
  fields = [],
  object = {},
}: {
  fields: string[];
  object: Object;
}) => {
  return _.pick(object, fields);
};

export { getInfoData };
