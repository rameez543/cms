import React from 'react';
import '../styles/productList.css';

export const ProductList = ({ list }) => {
    console.log('item', list)
    return (
        list  && list.length>0 ? list.map((item,key) => (
            <div className="card" key={key}>
                <div>
                    <h1>{`${item.productName}`}</h1>
                </div>
                <div className="card-content">
                    <table border={1} cellPadding={5} cellSpacing={5} width={600}>
                        <tbody>
                            <tr>
                                <td className='table-data'>Category</td>
                                <td>{item.categoryName}</td>
                            </tr>
                            <tr>
                                <td className='table-data'>Brand</td>
                                <td>{item.brandName}</td>
                            </tr>
                            <tr>
                                <td className='table-data'>Specification</td>
                                <td>{item.specification}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>)
        ):null
    )

}