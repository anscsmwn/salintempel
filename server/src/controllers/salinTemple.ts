import { Request, Response } from 'express';
import SalinTempel from '../model/salinTempel';

export const createSalinTempel = async (req: Request, res: Response) => {
  try {
    const result = await SalinTempel.create(req.body);
    res.status(201).json({
      status: 'success',
      end_point: req.originalUrl,
      method: req.method,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to create salin tempel.',
    });
  }
};

export const getSalinTempels = async (req: Request, res: Response) => {
  // destructuring query params and set default value
  const { offset = 0, limit = 1, sort = '' } = req.query;
  try {
    // execute query with offset and limit values
    const results = await SalinTempel.find()
      .skip(Number(offset))
      .limit(Number(limit))
      .sort({ createdAt: sort === 'createdAt' ? -1 : 1 })
      .exec();

    // get total documents in the SalinTempel collection
    const count = await SalinTempel.countDocuments();

    // return response with salin tempels, total count, and offset and limit values
    res.status(200).json({
      status: 'success',
      end_point: req.originalUrl,
      method: req.method,
      data: results,
      next:
        count > Number(offset) + Number(limit)
          ? `${req.protocol}://${req.get('host')}${req.originalUrl
              .split('?')
              .shift()}?offset=${Number(offset) + Number(limit)}&limit=${limit}`
          : null,
      previous:
        Number(offset) - Number(limit) >= 0
          ? `${req.protocol}://${req.get('host')}${req.originalUrl
              .split('?')
              .shift()}?offset=${Number(offset) - Number(limit)}&limit=${limit}`
          : null,
      count,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to get salin tempels.',
    });
  }
};

export const getRandomSalinTempel = async (req: Request, res: Response) => {
  const results = await SalinTempel.find();
  const random = Math.floor(Math.random() * results.length);
  res.status(200).json({
    status: 'success',
    end_point: req.originalUrl,
    method: req.method,
    data: results[random],
  });
};

export const deleteSalinTempel = async (req: Request, res: Response) => {
  try {
    const result = await SalinTempel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      end_point: req.originalUrl,
      method: req.method,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to delete salin tempel.',
    });
  }
};

export const likeSalinTempel = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
    const salinTempel = await SalinTempel.findById(id);
    if (!salinTempel) {
      return res.status(404).json({
        status: 'fail',
        end_point: req.originalUrl,
        method: req.method,
        message: 'Salin tempel not found.',
      });
    }

    const isLiked = salinTempel.likesBy.includes(userId);

    const result = await SalinTempel.findByIdAndUpdate(
      id,
      {
        likesBy: isLiked
          ? salinTempel.likesBy.filter((like) => like !== userId)
          : [...salinTempel.likesBy, userId],
        totalLikes: isLiked
          ? salinTempel.totalLikes - 1
          : salinTempel.totalLikes + 1,
      },
      { new: true },
    );

    res.status(200).json({
      status: 'success',
      end_point: req.originalUrl,
      method: req.method,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      end_point: req.originalUrl,
      method: req.method,
      message: 'Failed to like salin tempel.',
    });
  }
};
