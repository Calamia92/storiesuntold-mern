const express = require('express');
const sessionCtrl = require('../controllers/sessionController');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: API pour la gestion des sessions (stories)
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Récupère toutes les sessions (stories)
 *     responses:
 *       200:
 *         description: Liste de sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 */
router.get('/', sessionCtrl.getSessions);

/**
 * @swagger
 * /sessions:
 *   post:
 *     tags:
 *       - Sessions
 *     summary: Crée une nouvelle session (story)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet session à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Session créée
 *       400:
 *         description: Erreur lors de la création
 */
router.post('/', auth, sessionCtrl.createSession);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     tags:
 *       - Sessions
 *     summary: Récupère le détail d'une session et ses contributions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session
 *     responses:
 *       200:
 *         description: Détail de la session
 *       404:
 *         description: Session non trouvée
 */
router.get('/:id', sessionCtrl.getSessionDetail);

/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     tags:
 *       - Sessions
 *     summary: Met à jour une session (seulement par son créateur)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session
 *     requestBody:
 *       description: Données de mise à jour de la session
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Session mise à jour
 *       404:
 *         description: Session non trouvée ou accès refusé
 */
router.put('/:id', auth, sessionCtrl.updateSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     tags:
 *       - Sessions
 *     summary: Supprime une session (et cascade ses contributions)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session
 *     responses:
 *       200:
 *         description: Session supprimée
 *       404:
 *         description: Session non trouvée ou accès refusé
 */
router.delete('/:id', auth, sessionCtrl.deleteSession);

module.exports = router;
