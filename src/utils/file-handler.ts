import zl from 'zip-lib';

interface IExtractFile {
  name: string;
}

// TODO : check the await of the zl function
export async function extractFile({ name }: IExtractFile) {
  try {
    await zl.extract(`uploads/${name}`, 'companions');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
