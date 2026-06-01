import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

/**
 * API yo gushungura amapfundo (Reports) hakoreshejwe amatariki
 * GET /api/reports?start=YYYY-MM-DD&end=YYYY-MM-DD
 */
router.get('/', async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Start and end dates are required' });
    }

    // Query ihuriza hamwe Payments n'amazina y'abanyeshuri (JOIN)
    const sql = `
      SELECT p.*, s.full_name, s.class
      FROM payments p
      JOIN students s ON p.student_id = s.id
      WHERE p.payment_date BETWEEN ? AND ?
      ORDER BY p.payment_date DESC
    `;

    const rows = await query(sql, [start, end]);

    // Kubara igiteranyo cy'amafaranga yishyuwe mu gihe cyahiswemo
    const total = rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

    // Gusubiza ibisubizo mu buryo Frontend (ReportsPage.jsx) yiteze
    res.json({
      start,
      end,
      total_amount_paid: total,
      payments: rows.map(r => ({
        id: r.id,
        amount: r.amount,
        payment_date: r.payment_date.toISOString().split('T')[0],
        student: { full_name: r.full_name, class: r.class }
      }))
    });
  } catch (err) {
    console.error('Error fetching report:', err.message);
    res.status(500).json({ message: 'Guhanga raporo byanze.', error: err.message });
  }
});

export default router;