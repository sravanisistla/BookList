import React,{Component} from 'react';
import {stringTruncat} from '../utils/utils';

export default class List extends Component{

    render(){
        let { book } = this.props;
        return(
            <div >{book ? book.map((w,i) =>
                        <Item  w={w} key={i} {...this.props}/>                    
                    )
                    :
                    <div>none</div>
                }
            </div>
        );
    }
}

let Item = (props) => {
    return (
        <div className='listItem pad15h' onClick={e => props.selectItem(props.w)}>
            <a href="" className="close" aria-label="close" onClick={e => props.deleteItem(e,props.w.uid)}>×</a>
            <p><strong>{stringTruncat(props.w.name,20)}</strong></p>
            {stringTruncat(props.w.description,25)}
        </div>
    )
}