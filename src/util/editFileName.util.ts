import { extname } from "path";

export const editFileName = (name) => {
  const fileExtName = extname(name);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return  `${name.split(".")[0]}-${randomName}${fileExtName}`;
};