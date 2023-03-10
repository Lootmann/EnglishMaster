from sqlalchemy import create_engine

from api.models.sentences import Sentence
from api.settings import Settings

setting = Settings()

engine = create_engine(setting.migrate_db_url, echo=True)


def reset_database():
    Sentence.metadata.drop_all(bind=engine)
    Sentence.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
