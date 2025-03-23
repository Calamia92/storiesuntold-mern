const express = require('express');
const router = express.Router();
const contributionCtrl = require('../controllers/contributionController');
const auth = require('../middleware/auth');
const ownsContribution = require('../middleware/ownsContribution');

/**
 * @swagger
 * tags:
 *   - name: Contributions
 *     description: API pour la gestion des contributions
 */

/**
 * @swagger
 * /contributions:
 *   get:
 *     tags:
 *       - Contributions
 *     summary: Récupère les contributions selon un query param (sessionId ou creator)
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         description: L'ID de la session pour filtrer les contributions
 *       - in: query
 *         name: creator
 *         schema:
 *           type: string
 *         description: L'ID du créateur pour filtrer les contributions
 *     responses:
 *       200:
 *         description: Liste des contributions
 *       400:
 *         description: Paramètre query requis: sessionId ou creator
 */
router.get('/', (req, res) => {
    if (req.query.creator) {
        return contributionCtrl.getContributionsByCreator(req, res);
    } else if (req.query.sessionId) {
        return contributionCtrl.getContributionsForSession(req, res);
    }
    return res.status(400).json({ error: 'Paramètre query requis: sessionId ou creator' });
});

/**
 * @swagger
 * /contributions/{id}:
 *   get:
 *     tags:
 *       - Contributions
 *     summary: Récupère le détail d'une contribution
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Détail de la contribution
 *       404:
 *         description: Contribution non trouvée
 */
router.get('/:id', contributionCtrl.getContributionDetail);

/**
 * @swagger
 * /contributions:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Crée une contribution
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Objet contribution
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               chapitre:
 *                 type: number
 *               texte:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contribution créée
 *       400:
 *         description: Erreur lors de la création
 */
router.post('/', auth, contributionCtrl.createContribution);

/**
 * @swagger
 * /contributions/{id}:
 *   put:
 *     tags:
 *       - Contributions
 *     summary: Met à jour une contribution (seulement par son créateur)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     requestBody:
 *       description: Données à mettre à jour pour la contribution
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chapitre:
 *                 type: number
 *               texte:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contribution mise à jour
 *       404:
 *         description: Contribution non trouvée ou accès refusé
 */
router.put('/:id', auth, ownsContribution, contributionCtrl.updateContribution);

/**
 * @swagger
 * /contributions/{id}:
 *   delete:
 *     tags:
 *       - Contributions
 *     summary: Supprime une contribution (seulement par son créateur)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Contribution supprimée
 *       404:
 *         description: Contribution non trouvée ou accès refusé
 */
router.delete('/:id', auth, ownsContribution, contributionCtrl.deleteContribution);

/**
 * @swagger
 * /contributions/{id}/vote:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Vote pour une contribution (incrémente le compteur)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Contribution mise à jour avec le vote
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/:id/vote', auth, contributionCtrl.voteContribution);

/**
 * @swagger
 * /contributions/{id}/unvote:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Retire le vote de l'utilisateur pour une contribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Contribution mise à jour avec le retrait du vote
 *       400:
 *         description: L'utilisateur n'a pas voté
 */
router.post('/:id/unvote', auth, contributionCtrl.unvoteContribution);

/**
 * @swagger
 * /contributions/{id}/comment:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Ajoute un commentaire à une contribution
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     requestBody:
 *       description: Texte du commentaire
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texte:
 *                 type: string
 *     responses:
 *       200:
 *         description: Commentaire ajouté
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/:id/comment', auth, contributionCtrl.addComment);

/**
 * @swagger
 * /contributions/sessions/{sessionId}/approve/{contribId}:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Valide une contribution (modération)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session
 *       - in: path
 *         name: contribId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Contribution validée
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/sessions/:sessionId/approve/:contribId', auth, contributionCtrl.validateContribution);

/**
 * @swagger
 * /contributions/sessions/{sessionId}/reject/{contribId}:
 *   post:
 *     tags:
 *       - Contributions
 *     summary: Rejette une contribution (modération)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la session
 *       - in: path
 *         name: contribId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la contribution
 *     responses:
 *       200:
 *         description: Contribution rejetée
 *       404:
 *         description: Contribution non trouvée
 */
router.post('/sessions/:sessionId/reject/:contribId', auth, contributionCtrl.rejectContribution);

module.exports = router;
