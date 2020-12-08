import { PropTypes } from 'prop-types';
import Title from '../../../components/Title';
import DeleteMeme from '../../../components/Social/DeleteMeme';
import Info from '../../../components/Info';
import { containerWrapper } from '../../../class-names.json';

export default function DeleteMemeContainer({ match }) {
    const memeId = match.params.id;

    return (
        <section className={`${containerWrapper}`}>
            <Title />
            <DeleteMeme memeId={memeId} />
            <Info />
        </section>
    );
}

DeleteMemeContainer.propTypes = {
    match: PropTypes.object.isRequired,
};
