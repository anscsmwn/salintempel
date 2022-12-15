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
  const results = await SalinTempel.find();
  res.status(200).json({
    status: 'success',
    end_point: req.originalUrl,
    method: req.method,
    total: results.length,
    data: results,
  });
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

    const isLiked = salinTempel.likes.includes(userId);

    const result = await SalinTempel.findByIdAndUpdate(
      id,
      {
        likes: isLiked
          ? salinTempel.likes.filter((like) => like !== userId)
          : [...salinTempel.likes, userId],
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
