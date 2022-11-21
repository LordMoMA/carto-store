import { useEffect } from 'react';
import storesSource from 'data/sources/storesSource';
import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
import { useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  stores: {},
}));

export default function Stores() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(storesSource));

    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <div>
      <FormulaWidget
        id='totalRevenue'
        title='Total revenue'
        dataSource={storesSource.id}
        column='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
      />

      <Divider />

      <CategoryWidget
        id='revenueByStoreType'
        title='Revenue by store type'
        dataSource={storesSource.id}
        column='storetype'
        operationColumn='revenue'
        operation={AggregationTypes.SUM}
        formatter={currencyFormatter}
      />
    </div>
  );
}
