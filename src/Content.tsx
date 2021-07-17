import React, { useState } from 'react';
import FormSection from "./FormSection";
import ContentSection from "./ContentSection";
import TextBox from "./TextBox";
import TextArea from "./TextArea";
import './Content.css';


function Content() {
    let [startDate, setStartDate] = useState(new Date());
    let [courseSchedule, setCourseSchedule] = useState("");

    const updateCourseSchedule = (value: string) => {
        setCourseSchedule(value);
    };

    const updateStartDate = (value: string) => {
        setStartDate(new Date(value));
    };

    return(
        <div>
            <FormSection title={"1. Indicate Start Date"} >
                <div>
                    <p>
                        Indicate date of the <strong>Monday of Week 1</strong>
                        <br/><br/>
                        Click <strong><a href="https://www.ntu.edu.sg/admissions/matriculation/academic-calendars">here</a></strong> to view Academic Calendar.
                    </p>
                    <TextBox onChange={updateStartDate} />
                </div>
            </FormSection>

            <FormSection title={"2. Copy and Paste Course Schedule"}>
                <div>
                    <p>
                        1. Go to <strong>check/print course registered page</strong>
                        <br/>
                        2. <strong>Copy and paste</strong> table onto the box below
                    </p>
                    <TextArea value={courseSchedule} onChange={updateCourseSchedule} />
                </div>
            </FormSection>

            <ContentSection title="3. Start to download">
                <div>
                    <p>
                        Click on <strong>Download</strong> once you are ready!
                    </p>

                    <a className="button">Download</a>
                </div>
            </ContentSection>
        </div>
    );
}

export default Content;