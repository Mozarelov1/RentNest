import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { CreatePaymentDto } from '../dto/CreatePaymentDto';

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const jwt = require('jsonwebtoken');
const paymentService = require('../services/payment-service');

class PaymentController {

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);
      const userID = payload.sub;

      const dto: CreatePaymentDto = req.body;
      dto.userID = userID;

      const payment = await paymentService.createPayment(dto);
      res.status(201).json(payment);
    } catch (e) {
      console.error('Error creating payment:', e);
      next(e);
    }
  }

  async getPaymentList(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Bad Request: id missing in params' });
      }

      const list = await paymentService.getPaymentList(id);
      res.json(list);
    } catch (e) {
      console.error('Error fetching payment list:', e);
      next(e);
    }
  }

  async getPaymentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'Payment ID required' });
      }

      const payment = await paymentService.getPaymentById(id);
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.json(payment);
    } catch (e) {
      console.error('Error fetching payment:', e);
      next(e);
    }
  }

  async updatePaymentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      jwt.verify(token, process.env.JWT_SECRET);

      const id = req.params.id;
      const { status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ message: 'ID and status are required' });
      }

      const updated = await paymentService.updatePaymentStatus(id, status);
      res.json(updated);
    } catch (e) {
      console.error('Error updating payment status:', e);
      next(e);
    }
  }

  async cancelPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: token missing' });
      }
      jwt.verify(token, process.env.JWT_SECRET);

      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'Payment ID required' });
      }

      const cancelled = await paymentService.cancelPayment(id);
      res.json(cancelled);
    } catch (e) {
      console.error('Error cancelling payment:', e);
      next(e);
    }
  }
}

export default new PaymentController();


module.exports = new PaymentController();



// class PaymentController {
//   async createPayment(req: Request, res: Response, next: NextFunction) {
//     try {
//       const token = req.cookies?.jwt;
//       if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//       const payload: any = jwt.verify(token, process.env.JWT_SECRET);
//       const userID = payload.sub;

//       const dto: CreatePaymentDto = req.body;
//       dto.userID = userID; 

//       const payment = await paymentService.createPayment(dto);
//       res.status(201).json(payment);
//     } catch (e) {
//       console.error('Error creating payment:', e);
//       next(e);
//     }
//   }

//   async getPaymentList(req: Request, res: Response, next: NextFunction) {
//     try {
//       const token = req.cookies?.jwt;
//       if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//       jwt.verify(token, process.env.JWT_SECRET);

//       const list = await paymentService.getPaymentList();
//       res.json(list);
//     } catch (e) {
//       console.error('Error fetching payment list:', e);
//       next(e);
//     }
//   }

//   async getPaymentById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = req.params.id;
//       if (!id) {
//         return res.status(400).json({ message: 'Payment ID required' });
//       }

//       const payment = await paymentService.getPaymentById(id);
//       if (!payment) {
//         return res.status(404).json({ message: 'Payment not found' });
//       }
//       res.json(payment);
//     } catch (e) {
//       console.error('Error fetching payment:', e);
//       next(e);
//     }
//   }

//   async updatePaymentStatus(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = req.params.id;
//       const { status } = req.body;
//       if (!id || !status) {
//         return res.status(400).json({ message: 'ID and status are required' });
//       }

//       const updated = await paymentService.updatePaymentStatus(id, status);
//       res.json(updated);
//     } catch (e) {
//       console.error('Error updating payment status:', e);
//       next(e);
//     }
//   }

//   async cancelPayment(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = req.params.id;
//       if (!id) {
//         return res.status(400).json({ message: 'Payment ID required' });
//       }

//       const cancelled = await paymentService.cancelPayment(id);
//       res.json(cancelled);
//     } catch (e) {
//       console.error('Error cancelling payment:', e);
//       next(e);
//     }
//   }
// }