// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { screen } from '@testing-library/react';
// import { renderWithProviders } from '../../test/test-utils';
// import Categories from './Categories';
// import { mockCarouselCards } from '../../mockData/mockCarouselData';

// // Mock the useGetCategoriesData hook
// jest.mock('../../hooks/useGetCategoriesData', () => ({
//   useGetCategoriesData: jest.fn(),
// }));

// describe('Categories Component', () => {
//   it('renders loading skeleton when isLoading is true', () => {
//     // Mock isLoading as true
//     require('../../hooks/useGetCategoriesData').useGetCategoriesData.mockReturnValue({
//       data: null,
//       isLoading: true,
//     });

//     renderWithProviders(<Categories cards={mockCarouselCards} />);

//     // Check if the loading skeleton is rendered
//     expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
//   });

//   it('renders categories when isLoading is false', () => {
//     // Mock isLoading as false and provide sample data
//     require('../../hooks/useGetCategoriesData').useGetCategoriesData.mockReturnValue({
//       data: [
//         { categoryTitle: 'Category 1', categoryIcon: 'icon1.png', categorySortOrder: 1 },
//         { categoryTitle: 'Category 2', categoryIcon: 'icon2.png', categorySortOrder: 2 },
//       ],
//       isLoading: false,
//     });

//     renderWithProviders(<Categories cards={mockCarouselCards} />);

//     // Check if category titles are rendered
//     expect(screen.getByText('Category 1')).toBeInTheDocument();
//     expect(screen.getByText('Category 2')).toBeInTheDocument();
//   });
// });

export const CategoriesTest = () => { };
