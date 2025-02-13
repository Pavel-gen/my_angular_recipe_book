import { Recipe } from './recipe.model';
import { User } from './recipe.model';

export const USERS: User[] = [
  { id: '1', email: 'user1@example.com', password: 'password123' },
  { id: '2', email: 'user2@example.com', password: 'qwerty456' },
];

// export const RECIPES: Recipe[] = [
//   {
//     userId: 1,
//     id: 1,
//     title: 'Паста Карбонара',
//     image:
//       'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'спагетти', quantity: 200, unit: 'g' },
//       { name: 'бекон', quantity: 100, unit: 'g' },
//       { name: 'яйца', quantity: 2, unit: 'шт' },
//       { name: 'пармезан', quantity: 50, unit: 'g' },
//     ],
//     preparationTime: 20,
//     description:
//       'Классическая итальянская паста с беконом, яйцами и сыром пармезан.',
//     createdAt: '2023-01-15T14:30:00Z',
//   },
//   {
//     userId: 2,

//     id: 2,
//     title: 'Том Ям',
//     image:
//       'https://images.unsplash.com/photo-1739054239615-02944e9c338b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'куриный бульон', quantity: 500, unit: 'ml' },
//       { name: 'креветки', quantity: 150, unit: 'g' },
//       { name: 'лимонник', quantity: 1, unit: 'шт' },
//       { name: 'кокосовое молоко', quantity: 200, unit: 'ml' },
//     ],
//     preparationTime: 30,
//     description:
//       'Острый тайский суп с креветками, лимонником и кокосовым молоком.',
//     createdAt: '2023-02-05T11:45:00Z',
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: 'Салат Цезарь',
//     image:
//       'https://images.unsplash.com/photo-1738969773091-abcf274f7e0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'курица', quantity: 150, unit: 'g' },
//       { name: 'салат', quantity: 100, unit: 'g' },
//       { name: 'багет', quantity: 50, unit: 'g' },
//       { name: 'соус цезарь', quantity: 30, unit: 'ml' },
//     ],
//     preparationTime: 10,
//     description:
//       'Классический салат с курицей, листьями салата, багетом и соусом цезарь. Простой и вкусный!',
//     createdAt: '2023-03-10T09:20:00Z',
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: 'Борщ',
//     image:
//       'https://images.unsplash.com/photo-1738807992739-3bcd55323325?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'свекла', quantity: 200, unit: 'g' },
//       { name: 'капуста', quantity: 150, unit: 'g' },
//       { name: 'картофель', quantity: 100, unit: 'g' },
//       { name: 'томатная паста', quantity: 50, unit: 'g' },
//     ],
//     preparationTime: 60,
//     description:
//       'Традиционный украинский суп с богатым вкусом свеклы и овощей.',
//     createdAt: '2023-04-22T16:10:00Z',
//   },
//   {
//     userId: 2,
//     id: 5,
//     title: 'Пицца Маргарита',
//     image:
//       'https://images.unsplash.com/photo-1732528313074-29427989857f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'тесто для пиццы', quantity: 300, unit: 'g' },
//       { name: 'томатный соус', quantity: 100, unit: 'g' },
//       { name: 'моцарелла', quantity: 150, unit: 'g' },
//       { name: 'базилик', quantity: 10, unit: 'g' },
//     ],
//     preparationTime: 25,
//     description:
//       'Простая и вкусная пицца с томатным соусом, сыром моцарелла и базиликом.',
//     createdAt: '2023-05-12T13:50:00Z',
//   },
//   {
//     userId: 1,
//     id: 6,
//     title: 'Суши Филадельфия',
//     image:
//       'https://images.unsplash.com/photo-1585238342024-78d3870c3ac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'рис для суши', quantity: 200, unit: 'g' },
//       { name: 'лосось', quantity: 100, unit: 'g' },
//       { name: 'сливочный сыр', quantity: 50, unit: 'g' },
//       { name: 'нори', quantity: 2, unit: 'лист' },
//     ],
//     preparationTime: 40,
//     description: 'Изысканные суши с лососем, сливочным сыром и рисом.',
//     createdAt: '2023-06-03T10:00:00Z',
//   },
//   {
//     userId: 2,
//     id: 7,
//     title: 'Шашлык из свинины',
//     image:
//       'https://images.unsplash.com/photo-1739054239615-02944e9c338b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'свинина', quantity: 500, unit: 'g' },
//       { name: 'лук', quantity: 2, unit: 'шт' },
//       { name: 'соевый соус', quantity: 50, unit: 'ml' },
//       { name: 'специи', quantity: 10, unit: 'g' },
//     ],
//     preparationTime: 120,
//     description:
//       'Ароматный шашлык из свинины, маринованный в соевом соусе и специях.',
//     createdAt: '2023-07-18T18:30:00Z',
//   },
//   {
//     userId: 1,
//     id: 8,
//     title: 'Фруктовый салат',
//     image:
//       'https://plus.unsplash.com/premium_vector-1738790241233-140675e67b1f?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'яблоки', quantity: 2, unit: 'шт' },
//       { name: 'бананы', quantity: 2, unit: 'шт' },
//       { name: 'апельсины', quantity: 2, unit: 'шт' },
//       { name: 'мед', quantity: 20, unit: 'ml' },
//     ],
//     preparationTime: 15,
//     description:
//       'Легкий и освежающий салат из сезонных фруктов с добавлением меда.',
//     createdAt: '2023-08-05T09:10:00Z',
//   },
//   {
//     userId: 2,
//     id: 9,
//     title: 'Овсянка с бананом',
//     image:
//       'https://images.unsplash.com/vector-1738162097401-b6778597bf17?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     ingredients: [
//       { name: 'овсянка', quantity: 50, unit: 'g' },
//       { name: 'молоко', quantity: 200, unit: 'ml' },
//       { name: 'банан', quantity: 1, unit: 'шт' },
//       { name: 'мед', quantity: 10, unit: 'ml' },
//     ],
//     preparationTime: 10,
//     description: 'Здоровый завтрак из овсянки с молоком и бананом.',
//     createdAt: '2023-09-14T07:45:00Z',
//   },
//   {
//     userId: 1,
//     id: 10,
//     title: 'Чизкейк',
//     image:
//       'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'печенье', quantity: 200, unit: 'g' },
//       { name: 'сливочный сыр', quantity: 500, unit: 'g' },
//       { name: 'сахар', quantity: 100, unit: 'g' },
//       { name: 'желатин', quantity: 10, unit: 'g' },
//     ],
//     preparationTime: 90,
//     description: 'Нежный чизкейк с хрустящей основой из печенья.',
//     createdAt: '2023-10-02T15:20:00Z',
//   },
//   {
//     userId: 2,
//     id: 11,
//     title: 'Греческий салат',
//     image:
//       'https://images.unsplash.com/photo-1588782723426-e0725aa7438b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'огурцы', quantity: 200, unit: 'g' },
//       { name: 'помидоры', quantity: 200, unit: 'g' },
//       { name: 'фета', quantity: 100, unit: 'g' },
//       { name: 'оливковое масло', quantity: 30, unit: 'ml' },
//     ],
//     preparationTime: 15,
//     description: 'Освежающий салат с огурцами, помидорами и сыром фета.',
//     createdAt: '2023-11-11T12:50:00Z',
//   },
//   {
//     userId: 1,
//     id: 12,
//     title: 'Бургер',
//     image:
//       'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'говяжий фарш', quantity: 200, unit: 'g' },
//       { name: 'булочка', quantity: 1, unit: 'шт' },
//       { name: 'сыр', quantity: 50, unit: 'g' },
//       { name: 'салат', quantity: 50, unit: 'g' },
//     ],
//     preparationTime: 20,
//     description:
//       'Классический бургер с говяжьей котлетой, сыром и свежими овощами.',
//     createdAt: '2023-12-01T17:00:00Z',
//   },
//   {
//     userId: 2,
//     id: 13,
//     title: 'Рамен',
//     image:
//       'https://images.unsplash.com/photo-1594174932331-a890476f865b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'лапша рамен', quantity: 200, unit: 'g' },
//       { name: 'куриный бульон', quantity: 500, unit: 'ml' },
//       { name: 'яйцо', quantity: 1, unit: 'шт' },
//       { name: 'зеленый лук', quantity: 10, unit: 'g' },
//     ],
//     preparationTime: 25,
//     description: 'Японский суп с лапшой рамен и куриным бульоном.',
//     createdAt: '2024-01-10T08:30:00Z',
//   },
//   {
//     userId: 1,
//     id: 14,
//     title: 'Тирамису',
//     image:
//       'https://images.unsplash.com/photo-1576618148470-f58024afc505?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'маскарпоне', quantity: 250, unit: 'g' },
//       { name: 'кофе', quantity: 100, unit: 'ml' },
//       { name: 'печенье савоярди', quantity: 12, unit: 'шт' },
//       { name: 'какао', quantity: 20, unit: 'g' },
//     ],
//     preparationTime: 40,
//     description: 'Итальянский десерт с кофейным вкусом и нежным маскарпоне.',
//     createdAt: '2024-02-20T14:15:00Z',
//   },
//   {
//     userId: 2,
//     id: 15,
//     title: 'Курица Терияки',
//     image:
//       'https://images.unsplash.com/photo-1591218419091-efea54da750b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1260&q=80',
//     ingredients: [
//       { name: 'куриное филе', quantity: 300, unit: 'g' },
//       { name: 'соус терияки', quantity: 50, unit: 'ml' },
//       { name: 'рис', quantity: 200, unit: 'g' },
//       { name: 'кунжут', quantity: 10, unit: 'g' },
//     ],
//     preparationTime: 30,
//     description: 'Курица в сладком и соленом соусе терияки с гарниром из риса.',
//     createdAt: '2024-03-05T19:40:00Z',
//   },
// ];
