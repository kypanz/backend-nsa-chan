import { Response, Request } from 'express';
import { model_companion } from '../../models/database';
import { extractFile, imgToBase64 } from '../../utils/file-handler';

// TODO : create a util to extract the zip files

export async function companionCreate(req: Request, res: Response) {
  try {
    const { name, description } = req.body;
    if (!req.files) throw new Error('File not found');
    const file = (req.files as any)['file'][0];
    const image = (req.files as any)['image'][0];
    const path_extraction = await extractFile({ name: file.filename });
    const result_base64 = await imgToBase64({ name: image.filename });
    if (!result_base64) throw new Error('Error on convert image to base64');
    if (!path_extraction) throw new Error('Error on extractFile');
    await model_companion.create({
      name: name,
      description: description,
      image: `data:image/jpeg;base64,${result_base64}`,
      name_model_folder: file.path,
    });
    return res.json({
      message: 'Companion created'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Error on request'
    });
  }
}

export async function companionList(req: Request, res: Response) {
  try {
    const list = await model_companion.find();
    return res.json({ message: list });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Error on list companions'
    });
  }
}

export async function companionUpdate(req: Request, res: Response) {
  try {
    // TODO : logic here
    const {
      companion_id,
      name,
      description,
      image
    } = req.params; // body ??
    const companion = await model_companion.findOne({ _id: companion_id });
    if (!companion) {
      throw new Error('Companion not found');
    }
    companion.name = name;
    companion.description = description;
    companion.image = image;
    await companion.save();
    return res.json({
      message: 'Companion info updated'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Error on request'
    });
  }
}

export async function companionDelete(req: Request, res: Response) {
  try {
    // TODO : logic here
    const { companion_id } = req.params;
    await model_companion.deleteOne({ companion_id });
    return res.json({
      message: 'Deletion companion completed'
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Error on request'
    });
  }
}
