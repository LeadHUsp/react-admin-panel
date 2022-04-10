import React from 'react';
import { DepthSearchSelect } from 'components/UI-parts/DepthSearchSelect';

export default function Home() {
    const data = [
        {
            children: [
                {
                    children: [],
                    _id: '61ba3ee55b47cb1cc04c72b6',
                    name: 'Смартфоны',
                    slug: 'Smartfony',
                    seo_title: '',
                    seo_description: '',
                    seo_keywords: '',
                    long_description: 'Описание',
                    category_image: null,
                    parent_id: '61ba3ed55b47cb1cc04c72b5',
                    createdAt: '2021-12-15T19:15:49.524Z',
                    updatedAt: '2021-12-15T19:15:49.524Z',
                    __v: 0,
                },
                {
                    children: [],
                    _id: '61ba3f025b47cb1cc04c72b7',
                    name: 'Телевизоры',
                    slug: 'Televizory',
                    seo_title: '',
                    seo_description: '',
                    seo_keywords: '',
                    long_description: 'Описание',
                    category_image: null,
                    parent_id: '61ba3ed55b47cb1cc04c72b5',
                    createdAt: '2021-12-15T19:16:18.542Z',
                    updatedAt: '2021-12-15T19:16:18.542Z',
                    __v: 0,
                },
                {
                    children: [
                        {
                            children: [],
                            _id: '61ba40405b47cb1cc04c72bb',
                            name: 'Видеокарты',
                            slug: 'Videokarty',
                            seo_title: '',
                            seo_description: '',
                            seo_keywords: '',
                            long_description: 'Описание',
                            category_image: null,
                            parent_id: '61ba3f665b47cb1cc04c72b8',
                            createdAt: '2021-12-15T19:21:36.209Z',
                            updatedAt: '2021-12-15T19:21:36.209Z',
                            __v: 0,
                        },
                    ],
                    _id: '61ba3f665b47cb1cc04c72b8',
                    name: 'Комплектующие для ПК',
                    slug: 'Komplektuyushie-dlya-PK',
                    seo_title: '',
                    seo_description: '',
                    seo_keywords: '',
                    long_description: 'Описание',
                    category_image: null,
                    parent_id: '61ba3ed55b47cb1cc04c72b5',
                    createdAt: '2021-12-15T19:17:58.086Z',
                    updatedAt: '2021-12-15T19:21:36.274Z',
                    __v: 0,
                },
            ],
            _id: '61ba3ed55b47cb1cc04c72b5',
            name: 'Электроника',
            slug: 'Elektronika',
            seo_title: '',
            seo_description: '',
            seo_keywords: '',
            long_description: 'Описание',
            category_image: null,
            parent_id: null,
            createdAt: '2021-12-15T19:15:33.957Z',
            updatedAt: '2021-12-15T19:17:58.163Z',
            __v: 0,
        },
        {
            children: [
                {
                    children: [],
                    _id: '61ba3f825b47cb1cc04c72ba',
                    name: 'Чайники',
                    slug: 'Chajniki',
                    seo_title: '',
                    seo_description: '',
                    seo_keywords: '',
                    long_description: 'Описание',
                    category_image: null,
                    parent_id: '61ba3f755b47cb1cc04c72b9',
                    createdAt: '2021-12-15T19:18:26.507Z',
                    updatedAt: '2021-12-15T19:18:26.507Z',
                    __v: 0,
                },
            ],
            _id: '61ba3f755b47cb1cc04c72b9',
            name: 'Бытовая техника',
            slug: 'Bytovaya-tehnika',
            seo_title: '',
            seo_description: '',
            seo_keywords: '',
            long_description: 'Описание',
            category_image: null,
            parent_id: null,
            createdAt: '2021-12-15T19:18:13.602Z',
            updatedAt: '2021-12-15T19:18:26.585Z',
            __v: 0,
        },
    ];
    const [value, setValue] = React.useState([]);
    return (
        <div>
            <DepthSearchSelect
                value={value}
                options={data}
                depthKey="children"
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option._id}
                onChange={(newValue) => {
                    console.log(newValue);
                    setValue(newValue);
                }}
            />
        </div>
    );
}
