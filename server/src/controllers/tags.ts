import { Request, Response } from 'express';
import Tag from '../model/tag';

export const addTag = async (req: Request, res: Response) => {
  try {
    // check in body tags if one of the element tag not exist in database
    const tags = await Tag.find();
    const tagsName = tags.map((tag) => tag.name);
    const newTags = req.body.tags.filter(
      (tag: string) => !tagsName.includes(tag),
    );
    // add new tags to database
    const newTagsAdded = await Tag.insertMany(
      newTags.map((tag: string) => ({ name: tag })),
    );
    // return all tags
    const allTags = [...tags, ...newTagsAdded];
    res.status(200).json({
      status: 'success',

      end_point: req.originalUrl,
      method: req.method,
      data: allTags,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to add tag.',
    });
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      status: 'success',
      end_point: req.originalUrl,
      method: req.method,
      data: tags,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to get tags.',
    });
  }
};
