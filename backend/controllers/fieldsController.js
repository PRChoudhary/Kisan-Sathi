const prisma = require('../config/db');

// Temporary in-memory storage fallback for guest users or when DB is initializing
let guestFieldsStore = [];

const saveField = async (req, res, next) => {
  try {
    const { name, polygon, areaSqMeters, areaSqFeet, areaAcres, areaHectares, perimeterMeters, method } = req.body;

    if (!name || !polygon || !Array.isArray(polygon)) {
      return res.status(400).json({ success: false, message: 'Valid field name and polygon coordinates are required' });
    }

    const fieldData = {
      name,
      polygon,
      areaSqMeters: parseFloat(areaSqMeters) || 0,
      areaSqFeet: parseFloat(areaSqFeet) || 0,
      areaAcres: parseFloat(areaAcres) || 0,
      areaHectares: parseFloat(areaHectares) || 0,
      perimeterMeters: parseFloat(perimeterMeters) || 0,
      method: method || 'TAP_POINTS'
    };

    if (req.user && req.user.id) {
      try {
        const newField = await prisma.savedField.create({
          data: {
            ...fieldData,
            userId: req.user.id
          }
        });
        return res.status(201).json({ success: true, data: newField, isSavedToCloud: true });
      } catch (dbError) {
        console.warn('Database save skipped, using local fallback:', dbError.message);
      }
    }

    // Guest / Fallback store
    const guestField = {
      id: `guest-field-${Date.now()}`,
      ...fieldData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    guestFieldsStore.push(guestField);

    res.status(201).json({
      success: true,
      data: guestField,
      isSavedToCloud: false,
      message: req.user ? 'Saved to local session' : 'Field saved locally. Log in to sync to cloud!'
    });
  } catch (error) {
    next(error);
  }
};

const getFields = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      try {
        const fields = await prisma.savedField.findMany({
          where: { userId: req.user.id },
          orderBy: { createdAt: 'desc' }
        });
        return res.json({ success: true, count: fields.length, data: fields });
      } catch (dbError) {
        console.warn('Database read error, using guest memory fallback:', dbError.message);
      }
    }

    res.json({ success: true, count: guestFieldsStore.length, data: guestFieldsStore });
  } catch (error) {
    next(error);
  }
};

const updateField = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, polygon, areaSqMeters, areaSqFeet, areaAcres, areaHectares, perimeterMeters } = req.body;

    if (req.user && req.user.id && !id.startsWith('guest-')) {
      try {
        const updated = await prisma.savedField.update({
          where: { id, userId: req.user.id },
          data: {
            ...(name && { name }),
            ...(polygon && { polygon }),
            ...(areaSqMeters !== undefined && { areaSqMeters: parseFloat(areaSqMeters) }),
            ...(areaSqFeet !== undefined && { areaSqFeet: parseFloat(areaSqFeet) }),
            ...(areaAcres !== undefined && { areaAcres: parseFloat(areaAcres) }),
            ...(areaHectares !== undefined && { areaHectares: parseFloat(areaHectares) }),
            ...(perimeterMeters !== undefined && { perimeterMeters: parseFloat(perimeterMeters) })
          }
        });
        return res.json({ success: true, data: updated });
      } catch (dbErr) {
        console.warn('DB update failed, attempting local update:', dbErr.message);
      }
    }

    const index = guestFieldsStore.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Field not found' });
    }

    guestFieldsStore[index] = {
      ...guestFieldsStore[index],
      ...(name && { name }),
      ...(polygon && { polygon }),
      ...(areaSqMeters !== undefined && { areaSqMeters: parseFloat(areaSqMeters) }),
      ...(areaSqFeet !== undefined && { areaSqFeet: parseFloat(areaSqFeet) }),
      ...(areaAcres !== undefined && { areaAcres: parseFloat(areaAcres) }),
      ...(areaHectares !== undefined && { areaHectares: parseFloat(areaHectares) }),
      ...(perimeterMeters !== undefined && { perimeterMeters: parseFloat(perimeterMeters) }),
      updatedAt: new Date().toISOString()
    };

    res.json({ success: true, data: guestFieldsStore[index] });
  } catch (error) {
    next(error);
  }
};

const deleteField = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user && req.user.id && !id.startsWith('guest-')) {
      try {
        await prisma.savedField.delete({
          where: { id, userId: req.user.id }
        });
        return res.json({ success: true, message: 'Field deleted successfully' });
      } catch (dbErr) {
        console.warn('DB delete error, using local fallback:', dbErr.message);
      }
    }

    guestFieldsStore = guestFieldsStore.filter(f => f.id !== id);
    res.json({ success: true, message: 'Field deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveField,
  getFields,
  updateField,
  deleteField
};
