const mandiData = require('../data/mandiData');

const getMandiPrices = async (req, res, next) => {
  try {
    let {
      crop,
      state,
      district,
      market,
      search,
      sortBy = 'modalPrice',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    let filtered = [...mandiData];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(item =>
        item.cropName.toLowerCase().includes(q) ||
        item.state.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.market.toLowerCase().includes(q)
      );
    }

    // Specific filters
    if (crop) {
      filtered = filtered.filter(item => item.cropName.toLowerCase().includes(crop.toLowerCase()));
    }
    if (state) {
      filtered = filtered.filter(item => item.state.toLowerCase() === state.toLowerCase());
    }
    if (district) {
      filtered = filtered.filter(item => item.district.toLowerCase() === district.toLowerCase());
    }
    if (market) {
      filtered = filtered.filter(item => item.market.toLowerCase().includes(market.toLowerCase()));
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Pagination
    const totalCount = filtered.length;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);

    // Get unique metadata for filter dropdowns
    const states = [...new Set(mandiData.map(item => item.state))].sort();
    const districts = [...new Set(mandiData.map(item => item.district))].sort();
    const crops = [...new Set(mandiData.map(item => item.cropName))].sort();
    const markets = [...new Set(mandiData.map(item => item.market))].sort();

    res.json({
      success: true,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      limit: limitNum,
      filters: { states, districts, crops, markets },
      data: paginated
    });
  } catch (error) {
    next(error);
  }
};

const searchMandiPrices = async (req, res, next) => {
  return getMandiPrices(req, res, next);
};

module.exports = {
  getMandiPrices,
  searchMandiPrices
};
