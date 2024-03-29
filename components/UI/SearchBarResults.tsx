import React from 'react';
import styles from '@styles/UI/SearchBarResults.module.css';

interface Props {
    searchResults: { ticker: string, name: string }[],
    highlightedResult: number,
    clickResultHandler: (arg: string) => void
}

const SearchBarResults = ({ searchResults, highlightedResult, clickResultHandler }: Props) => {
    return (
        <div role="search_results_container" className={`${styles.searchResultsContainer} relative`}>
            <ul className={`${styles.searchResultsList} absolute z-10 bg-white shadow-lg rounded-b-md`} >
                {searchResults.map((i, index) => {
                    return (
                        <li role="search_result_item" className={`${styles.searchItem} rounded-md hover:scale-105 px-8 py-4 duration-150 ${highlightedResult === index && styles.highlight}`} key={i.ticker} onClick={() => clickResultHandler(i.ticker)} >
                            <span className={styles.ticker} >{i.ticker}</span>
                            <span className={styles.companyName} >{i.name}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchBarResults