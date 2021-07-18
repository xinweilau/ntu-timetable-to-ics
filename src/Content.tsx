import React, { useState } from 'react';
import FormSection from "./FormSection";
import ContentSection from "./ContentSection";
import TextBox from "./TextBox";
import TextArea from "./TextArea";
import CalendarGenHelper from "./CalendarGenHelper";
// @ts-ignore
import FileSaver from 'file-saver';

function Content() {
    let [startDate, setStartDate] = useState(new Date());
    let [courseSchedule, setCourseSchedule] = useState("");
    let [base64Calendar, setBase64Calendar] = useState("");

    const updateCourseSchedule = (value: string) => {
        setCourseSchedule(value);
    };

    const updateStartDate = (value: string) => {
        setStartDate(new Date(value));
    };

    const generateCalendar = () => {
        let gen: CalendarGenHelper = new CalendarGenHelper(startDate, courseSchedule);
        setBase64Calendar(gen.processCourseSchedule());
    }

    const startDownload = () => {
        let blob = new Blob([base64Calendar], {type: "text/calendar;charset=utf-8"});
        FileSaver.saveAs(blob, "Class Schedule.ics");
    }

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
                        1. Click on <strong>Generate</strong> button once you are ready!<br />
                        2. Wait for the <strong>Download</strong> button to appear.<br />
                        <br />
                        The <strong>Download</strong> button will appear once it is ready for download.
                    </p>

                    <a className="button" onClick={generateCalendar}>Generate</a>
                    { (base64Calendar.length > 0) &&
                        <a className="button" onClick={startDownload}>Download</a>
                    };
                </div>
            </ContentSection>
        </div>
    );
}

export default Content;