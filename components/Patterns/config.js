export const pattern_config = [{
    numberOfPatterns:4,
    numberOfGrids:8,
    gridColor:'green',
},
{
    numberOfPatterns:4,
    numberOfGrids:8,
    gridColor:'red',
},
{
    numberOfPatterns:4,
    numberOfGrids:8,
    gridColor:'blue',
},{
    numberOfPatterns:4,
    numberOfGrids:8,
    gridColor:'yellow',
}]


export  const getImageSource = (index) => {
    let url = null
    switch(index) {
      case 0:
        url =  require('../../assets/bluePattern.png')
      case 1:
        url = require('../../assets/bluePattern.png')
      case 2:
        url = require('../../assets/bluePattern.png')
      case 3:
        url = require('../../assets/bluePattern.png')
      case 4:
        url = require('../../assets/bluePattern.png')
    }
    return url
  }