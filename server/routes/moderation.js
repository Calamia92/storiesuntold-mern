/**
 * @swagger
 * tags:
 *   - name: Moderation
 *     description: API pour la modération des contributions
 */

const express = require('express');
const contributionCtrl = require('../controllers/contributionController');
const auth = require('../middleware/auth');
const ownsSession = require('../middleware/ownsSession');
const ownsContrib = require('../middleware/ownsContribution');

const router = express.Router();

/**
 * @swagger
 * /moderation/sessions/{sessionId}/approve/{contribId}:
 *   post:
 *     tags:
 *       - Moderation
 *     summary: Approuve une contribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session contenant la contribution
 *       - in: path
 *         name: contribId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution à approuver
 *     responses:
 *       200:
 *         description: Contribution approuvée
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/sessions/:sessionId/approve/:contribId', auth, ownsSession, contributionCtrl.validateContribution);

/**
 * @swagger
 * /moderation/sessions/{sessionId}/reject/{contribId}:
 *   post:
 *     tags:
 *       - Moderation
 *     summary: Rejette une contribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session contenant la contribution
 *       - in: path
 *         name: contribId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution à rejeter
 *     responses:
 *       200:
 *         description: Contribution rejetée
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/sessions/:sessionId/reject/:contribId', auth, ownsContrib, contributionCtrl.rejectContribution);

module.exports = router;
