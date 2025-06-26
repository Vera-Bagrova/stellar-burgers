import { RequestStatus } from "@utils-types";
import { feedActions, feedSlice, TFeedState } from "../slices/feed";

describe('feedSlice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle,
    error: null
  };

  it('Проверка fetchFeeds.pending', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: RequestStatus.Loading,
      error: null
    };

    const resultState = feedSlice.reducer(
      {
        ...initialState,
        error: 'test error'
      }, 
      feedActions.fetchFeeds.pending('')
    );

    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchFeeds.fulfilled', () => {
    const orders = [
      {
        _id: '1',
        status: 'done',
        name: 'test order',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 111222,
        ingredients: ['ingredient 1', 'ingredient 2']
      }
    ];
    const total = 1;
    const totalToday = 1;
    const feedsResponse = {
      success: true,
      orders,
      total,
      totalToday
    };
    const expectedState: TFeedState = {
      orders,
      total,
      totalToday,
      status: RequestStatus.Success,
      error: null
    };

    const resultState = feedSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      }, 
      feedActions.fetchFeeds.fulfilled(feedsResponse, '')
    );
    
    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchFeeds.rejected', () => {
    const expectedState: TFeedState = {
      ...initialState,
      status: RequestStatus.Failed,
      error: 'test error'
    };

    const resultState = feedSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      }, 
      feedActions.fetchFeeds.rejected(new Error('test error'), '')
    );

    expect(resultState).toEqual(expectedState);
  });
})
