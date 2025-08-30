"use client";

import { useState, useEffect } from 'react';
import { getTriviaQuestionsAction } from './actions';
import type { TriviaQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';


export default function QuizTriviaGame() {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [gameState, setGameState] = useState<'loading' | 'playing' | 'finished'>('loading');

    const loadQuestions = async () => {
        setGameState('loading');
        const result = await getTriviaQuestionsAction(5); // Get 5 questions
        if (result.questions) {
            setQuestions(result.questions);
            setGameState('playing');
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            // Handle error case
            console.error("Failed to load questions");
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleAnswerSelect = (answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            setGameState('finished');
        }
    }

    if (gameState === 'loading') {
        return (
             <Card className="w-full max-w-2xl text-center p-8">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground">Loading Trivia...</p>
            </Card>
        )
    }

    if (gameState === 'finished') {
        return (
             <Card className="w-full max-w-2xl text-center">
                <CardHeader>
                    <CardTitle>Quiz Complete!</CardTitle>
                    <CardDescription>You've reached the end of the trivia.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">Your Score: {score} / {questions.length}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={loadQuestions} size="lg">
                        <RotateCcw className="mr-2"/>
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-4" />
                <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-lg font-semibold pt-2 min-h-[5rem]">{currentQuestion.question}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {currentQuestion.options.map(option => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = option === selectedAnswer;

                    return (
                        <Button
                            key={option}
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left h-auto py-3 text-base",
                                isAnswered && isCorrect && "bg-green-100 border-green-500 text-green-800 hover:bg-green-200",
                                isAnswered && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-800 hover:bg-red-200",
                                isAnswered && !isSelected && "disabled:opacity-70"
                            )}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswered}
                        >
                            {isAnswered && isSelected && isCorrect && <CheckCircle className="mr-2 text-green-600"/>}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="mr-2 text-red-600"/>}
                            {isAnswered && !isSelected && isCorrect && <CheckCircle className="mr-2 text-green-600"/>}
                            {option}
                        </Button>
                    )
                })}
            </CardContent>
            <CardFooter className="justify-end">
                {isAnswered && (
                     <Button onClick={handleNextQuestion} size="lg">
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
