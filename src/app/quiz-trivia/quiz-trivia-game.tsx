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
             <Card className="glassmorphic border-white/10 w-full max-w-2xl text-center p-8 rounded-2xl mx-auto">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-white/80">Loading Trivia...</p>
            </Card>
        )
    }

    if (gameState === 'finished') {
        return (
             <Card className="glassmorphic border-white/10 w-full max-w-2xl text-center rounded-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-white">Quiz Complete!</CardTitle>
                    <CardDescription className="text-white/60">You've reached the end of the trivia.</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                    <p className="text-4xl font-extrabold text-white text-glow-dynamic" style={{ ['--glow-rgb' as any]: '14, 165, 233' }}>Your Score: {score} / {questions.length}</p>
                </CardContent>
                <CardFooter className="justify-center pb-6">
                    <Button onClick={loadQuestions} className="bg-primary hover:bg-primary/85 text-white rounded-xl shadow-lg shadow-primary/20">
                        <RotateCcw className="mr-2 h-4 w-4"/>
                        Play Again
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Card className="glassmorphic border-white/10 w-full max-w-2xl rounded-2xl mx-auto">
            <CardHeader>
                <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mb-4 bg-white/5 h-2" />
                <CardTitle className="text-white">Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription className="text-lg font-bold text-white pt-2 min-h-[5rem]">{currentQuestion.question}</CardDescription>
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
                                "w-full justify-start text-left h-auto py-3 px-4 text-base border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-primary/40 rounded-xl transition-all duration-200",
                                isAnswered && isCorrect && "bg-green-500/10 border-green-500/40 text-green-400 hover:bg-green-500/20 hover:text-green-300",
                                isAnswered && isSelected && !isCorrect && "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20 hover:text-red-300",
                                isAnswered && !isSelected && "opacity-40"
                             )}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswered}
                        >
                            {isAnswered && isSelected && isCorrect && <CheckCircle className="mr-2 text-green-400 h-5 w-5"/>}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="mr-2 text-red-400 h-5 w-5"/>}
                            {isAnswered && !isSelected && isCorrect && <CheckCircle className="mr-2 text-green-400 h-5 w-5"/>}
                            {option}
                        </Button>
                    )
                })}
            </CardContent>
            <CardFooter className="justify-end pb-6">
                {isAnswered && (
                     <Button onClick={handleNextQuestion} className="bg-primary hover:bg-primary/85 text-white rounded-xl shadow-lg shadow-primary/20">
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
