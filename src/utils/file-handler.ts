import * as zl from 'zip-lib';

interface IExtractFile {
  name: string;
}

// TODO : check the await of the zl function
export async function extractFile({ name }: IExtractFile) {
  try {
    const path_extraction = `companions/${name}`;
    zl.extract(`uploads/${name}`, path_extraction);
    return path_extraction;
  } catch (error) {
    console.error(error);
    return false;
  }
}
