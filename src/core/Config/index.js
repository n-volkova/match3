let Config = {
  'paths': {
    'imagesUri': 'img/'
  },

  'field': {
    'frontTileSpeed': 550, // px per sec
    // 6x6
    'frontTileWidth': 87,
    'frontTileHeight': 85,

    /* All patterns to look for matches on the field. All pieces will be going through these
        patterns and be using pattern items relative to themselves col and row
        +/- means that a pattern will be looking for pieces as long as they will be there
        depending on previous tile, and also means that it's not required. '+' and '-' can find
        nothing, and it's will be counted (unlike usual pattern items). E.g.:
                (0,0) (0,1) (0,'+') is like (0,0) (0,1) (0,2) (0,3) ...) because '+' took last row-value
                (0,0) (0,'+') is same: (0,0) (0,1) (0,2) (0,3) ...) because '+' took last row-value
                (0,'+') is same too (0,0) (0,1) (0,2) (0,3) ...), when last-row doesn't exist then +/- takes it as zero
                the same for minus:
                (0,0) (0,1) (0,'-') is like (0,0) (0,1) (0,0) (0,-1) ...) - no sense, but shows the point of minus
                (0,0) (0, -1) (0,'-') is like (0,0) (0,-1) (0,-2) (0,-3) ...) - no sense, but shows the point of minus
                using (0,0) second and more time means that we kind of 'move pointer' before '+' or '-' pattern
        all patterns will be checked in their order, so it has a sense to put on the top the most
        unusual and weird patterns and after those other ones.
        minMatch - minimal number of front tiles to match
        extraScore - 0 element - how many extra score we get if we match (minMatch + 1) pieces
                        1 element - how many extra score we get if we match (minMatch + 2) pieces etc... */
    'matchPatterns': [{
      /** 00000
            0111+
            00000
        */
      'name': 'horizontal',
      'minMatch': 3,
      'score': 100,
      'extraScore': [150, 400, 900],
      'list': [[0, 0], [1, 0], ['+', 0]]
    }, {
      /** 00100
            00100
            00100
            00+00
        */
      'name': 'vertical',
      'minMatch': 3,
      'score': 100,
      'extraScore': [150, 400, 900],
      'list': [[0, 0], [0, 1], [0, '+']]
    }
    ]
  },

  /** Which content we load before starting game (key - cid, value - array of prop names) */
  'initialCIDs': {
    1: ['icon', 'iconSelected', 'score100', 'score250', 'score500'],
    2: ['icon', 'iconSelected', 'score100', 'score250', 'score500'],
    3: ['icon', 'iconSelected', 'score100', 'score250', 'score500'],
    4: ['icon', 'iconSelected', 'score100', 'score250', 'score500'],
    5: ['icon', 'iconSelected', 'score100', 'score250', 'score500'],
    7: ['icon'],
    8: ['score1000'],
  },

  /** Which front tiles are available on the field */
  'frontCIDs': [1, 2, 3, 4, 5],

  /** Game content */
  'content': {
    '1': {
      'cid': 1,
      'name': 'pink',
      'icon': 'pink.png',
      'iconSelected': 'pink-selected.png',
      'color': '0xf100ff',
      'score100': 'pink-score-100.png',
      'score250': 'pink-score-250.png',
      'score500': 'pink-score-500.png'
    },
    '2': {
      'cid': 2,
      'name': 'orange',
      'icon': 'orange.png',
      'iconSelected': 'orange-selected.png',
      'color': '0xfd9e12',
      'score100': 'orange-score-100.png',
      'score250': 'orange-score-250.png',
      'score500': 'orange-score-500.png'
    },
    '3': {
      'cid': 3,
      'name': 'green',
      'icon': 'green.png',
      'iconSelected': 'green-selected.png',
      'color': '0x3ffd00',
      'score100': 'green-score-100.png',
      'score250': 'green-score-250.png',
      'score500': 'green-score-500.png'
    },
    '4': {
      'cid': 4,
      'name': 'blue',
      'icon': 'blue.png',
      'iconSelected': 'blue-selected.png',
      'color': '0x00ffff',
      'score100': 'blue-score-100.png',
      'score250': 'blue-score-250.png',
      'score500': 'blue-score-500.png'
    },
    '5': {
      'cid': 5,
      'name': 'r',
      'icon': 'r.png',
      'iconSelected': 'r-selected.png',
      'color': '0xfdffff',
      'score100': 'r-score-100.png',
      'score250': 'r-score-250.png',
      'score500': 'r-score-500.png'
    },
    '6': {
      'cid': 6,
      'name': 'level',
      'cols': 6,
      'rows': 6
    },
    '7': {
      'cid': 7,
      'name': 'bg',
      'icon': 'scene-straight.png'
    },

    '8': {
      'cid': 8,
      'name': 'score-1000',
      'score1000': 'score-1000.png',
    },
  }
};

export default Config;