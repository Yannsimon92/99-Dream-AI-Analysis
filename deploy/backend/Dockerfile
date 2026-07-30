FROM python:3.11-slim

RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir --user torch --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir --user -r requirements.txt

COPY --chown=user app/ ./app/
COPY --chown=user src/ ./src/
COPY --chown=user data/processed/ ./data/processed/

ENV HF_HOME=/app/.cache

EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
