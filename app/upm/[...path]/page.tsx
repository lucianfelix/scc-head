'use server';

import {parse} from '../../../lib/data';
import {Page as RnaPage} from '../../../components/standard/Page';
import "../styles.css";

export async function generateStaticParams() {
    return [
        {path: ['articles','up-pgh-covid-19-bayanihan-na-operations-center']},
        {path: ['articles','up-manila-covid-19-updates']},
        {path: ['articles','up-manila-health-advisories']},
        {path: ['articles','healthscape-issue-no-43-september-2022']},
        {path: ['articles','the-stop-covid-deaths-webinar-series-bags-2022-silver-quill-award-of-excellence']},
        {path: ['articles','infectious-disease-expert-shares-tips-in-responding-to-monkeypox']},
        {path: ['articles','up-will-teach-you-to-align-knowledge-with-societys-needs-bersola-to-up-manilas-new-students']},
        {path: ['articles','us-based-expert-explains-monkeypox-origins-transmission-and-clinical-presentation']},
        {path: ['articles','disaster-risk-reduction-and-management-in-health-center']},
        {path: ['articles','1st-ph-book-on-diagnosis-and-management-of-strabismus-out']},
        {path: ['articles','up-manila-prof-named-outstanding-filipino-by-metrobank-foundation']},
        {path: ['articles','acta-medica-philippina-vol-56-no-17-2022']},
        {path: ['articles','call-for-proposals-nih-faculty-research-grant-2023']},
        {path: ['articles','event-career-guidance-marketing-me-live']},
        {path: ['articles','event-integrating-data-governance-principles-into-philippine-health-education-15-october-2022']},
        {path: ['articles','selection-of-new-faculty-regent-2023-2024']},
        {path: ['articles','event-community-medicine-the-essence-of-primary-health-care-pascom-annual-conference']},
        {path: ['articles','ungkat-usapang-aklat-mga-aklat-tungkol-sa-batas-militar-21-september-2022']},
        {path: ['articles','53rd-asia-pacific-academic-consortium-for-public-health-apacph-international-conference']},
    ];
}

type Params = {
    path: string[];
}

export default async function Page({params}: {params: Params}) {
    const hlxPath = params.path.join('/');
    console.log(hlxPath)
    const source = await parse(
        `https://main--upm--hlxsites.hlx.live/${hlxPath}`,
        []
    );

    return (
        <div className="page">
            <RnaPage data={source} indexData={{}}/>
        </div>
    );
}
