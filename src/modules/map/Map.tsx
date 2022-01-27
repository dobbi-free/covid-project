import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from '../../components/MapChart/MapChart';

export const Map = () => {
    const [content, setContent] = useState("");
    return (
        <div>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip html={true} multiline={true}>{content}</ReactTooltip>
        </div>
    );
};
