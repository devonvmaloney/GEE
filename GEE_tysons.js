//Google Earth Engine Time 
//Devon Maloney 

//Location: Tysons, Virginia
//Years: 1989, 1999, 2009, 2014, 2019

//Google Earth Engine Time 
//Devon Maloney 

//Location: Tysons, Virginia
//Years: 1989, 1999, 2009, 2014, 2019


/**
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
    // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = (1 << 3);
    var cloudsBitMask = (1 << 5);
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                   .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return image.updateMask(mask);
  }
  
  var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                    .filterDate('2019-01-01', '2020-03-15')
                    .map(maskL8sr);
                    
  var landsat2019 = dataset.median().clip(geometry);
  
  var visParamsL8 = {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 3000,
    gamma: 1.4,
  };
  
  var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                    .filterDate('2014-01-01', '2015-03-15')
                    .map(maskL8sr);
                    
  var landsat2014 = dataset.median().clip(geometry);
  
  /**
   * Function to mask clouds based on the pixel_qa band of Landsat SR data.
   * @param {ee.Image} image Input Landsat SR image
   * @return {ee.Image} Cloudmasked Landsat image
   */
  var cloudMaskL457 = function(image) {
    var qa = image.select('pixel_qa');
    // If the cloud bit (5) is set and the cloud confidence (7) is high
    // or the cloud shadow bit is set (3), then it's a bad pixel.
    var cloud = qa.bitwiseAnd(1 << 5)
                    .and(qa.bitwiseAnd(1 << 7))
                    .or(qa.bitwiseAnd(1 << 3));
    // Remove edge pixels that don't occur in all bands
    var mask2 = image.mask().reduce(ee.Reducer.min());
    return image.updateMask(cloud.not()).updateMask(mask2);
  };
  
  var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                    .filterDate('2008-01-01', '2010-12-31')
                    .map(cloudMaskL457);
  
  var landsat2009 = dataset.median().clip(geometry)
  
  
  var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                    .filterDate('1998-01-01', '2000-12-31')
                    .map(cloudMaskL457);
  
  var landsat1999 = dataset.median().clip(geometry)
  
  
  var dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
                    .filterDate('1988-01-01', '1990-12-31')
                    .map(cloudMaskL457);
  
  var landsat1989 = dataset.median().clip(geometry)
  
  
  var visParamsL5 = {
    bands: ['B3', 'B2', 'B1'],
    min: 0,
    max: 3000,
    gamma: 1.4,
  };
  
  
  Map.setCenter(-77.2617, 38.9235,12);
  Map.addLayer(landsat2019, visParamsL8,'2019');
  Map.addLayer(landsat2014, visParamsL8,'2014');
  Map.addLayer(landsat2009, visParamsL5,'2009');
  Map.addLayer(landsat1999, visParamsL5,'1999');
  Map.addLayer(landsat1989, visParamsL5,'1989');
  
  Export.image.toDrive ({
    image: landsat2019,
    description: 'Y2019',
    scale: 30,
    region: geometry
  })
  
  Export.image.toDrive ({
    image: landsat2014,
    description: 'Y2014',
    scale: 30,
    region: geometry
  })
  
  Export.image.toDrive ({
    image: landsat2009,
    description: 'Y2009',
    scale: 30,
    region: geometry
  })
  
  Export.image.toDrive ({
    image: landsat1999,
    description: 'Y1999',
    scale: 30,
    region: geometry
  })
  
  Export.image.toDrive ({
    image: landsat1989,
    description: 'Y1989',
    scale: 30,
    region: geometry
  })
  