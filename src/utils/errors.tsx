import { stringToFirstUppercase } from "./strings";

export interface ErrorMessageForProperty {
  property: string;
  message: string;
}

export type InputErrors = Record<string, string | null>;

export const errorsArrayToRecord = (
  errorsArr: Array<ErrorMessageForProperty>
) => {
  const errorsRecord: Record<string, string> = {};

  errorsArr.forEach((err) => {
    errorsRecord[err.property] = stringToFirstUppercase(err.message);
  });

  return errorsRecord;
};
